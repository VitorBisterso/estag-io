import React, { Children } from 'react';
import { View, ViewStyle } from 'react-native';

type GapDirection = 'vertical' | 'horizontal';

interface Props {
   gap?: number;
   direction?: GapDirection;
   style?: ViewStyle;
   // eslint-disable-next-line react/require-default-props
   flex?: number;
   divider?: React.ReactNode;
   children: React.ReactNode;
}

export default function Gap({
   gap,
   direction,
   style,
   flex = direction === 'horizontal' ? 1 : undefined,
   divider,
   children,
}: Props) {
   const kids = Children.toArray(children);

   const isVertical = direction === 'vertical';
   const flexDirection = isVertical ? 'column' : 'row';
   const styleKey = isVertical ? 'height' : 'width';

   return (
      <View style={[{ flexDirection }, style]}>
         {Children.map(kids, (child, index) => (
            <>
               {index > 0
                  ? divider || <View style={{ [styleKey]: gap }} />
                  : null}
               <View style={{ flex }}>{child}</View>
            </>
         ))}
      </View>
   );
}

Gap.defaultProps = {
   gap: 4,
   direction: 'vertical',
   style: undefined,
   divider: undefined,
};
