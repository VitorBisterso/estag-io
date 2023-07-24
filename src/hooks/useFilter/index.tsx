import React, {
   createContext,
   useContext,
   useState,
   useMemo,
   useEffect,
} from 'react';

function isNullOrUndefined(value: any) {
   return value === null || value === undefined;
}

function removeEmptyProperties<T extends object>(object: any) {
   return Object.keys(object).reduce<T>((acc, ac) => {
      if (
         (typeof object[ac] !== 'boolean' && isNullOrUndefined(object[ac])) ||
         object[ac] === ''
      )
         return acc;

      return {
         ...acc,
         [ac]: object[ac],
      };
   }, {} as any);
}

type Args<T extends object> = {
   initialState: T;
   onChangeState: (filterState: T) => void;
};

export default function useFilter<TInputs extends object>(args: Args<TInputs>) {
   const [filterState, setFilterState] = useState<TInputs>(args.initialState);

   function reset() {
      setFilterState(args.initialState);
   }

   useEffect(() => {
      args.onChangeState(filterState);
   }, [filterState]);

   return useMemo(
      () => ({
         state: removeEmptyProperties(filterState),
         set: (newValues: Partial<TInputs>) =>
            setFilterState((currentState) => ({
               ...currentState,
               ...newValues,
            })),
         reset,
      }),
      [filterState],
   );
}

type FilterContextType<TInputs extends object> = {
   state: TInputs;
   set: (values: Partial<TInputs>) => void;
   reset: () => void;
};

export const FilterContext = createContext<FilterContextType<any>>({
   state: {},
   set: () => undefined,
   reset: () => undefined,
});

interface FilterProviderProps {
   children: React.ReactNode;
   filter: FilterContextType<any>;
}

export function FilterProvider({ children, filter }: FilterProviderProps) {
   return (
      <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
   );
}

export function useFilterContext<Values extends object>() {
   const filter = useContext<FilterContextType<Values>>(FilterContext);

   if (!filter)
      throw new Error(
         'Tenha certeza de que você está chamando useFilterContext() dentro de um FilterProvider',
      );

   return filter;
}
