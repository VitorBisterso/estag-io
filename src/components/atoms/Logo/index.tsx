/* eslint-disable react/jsx-props-no-spreading */
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={200}
         height={200}
         fill="none"
         {...props}
      >
         <Path
            fill="#3EC855"
            fillRule="evenodd"
            d="M49.61 145.312c66.662 0 120.703-49.668 120.703-110.937 0-1.889-.052-3.767-.153-5.633C188.58 46.88 200 72.106 200 100c0 55.228-44.772 100-100 100-41.613 0-77.29-25.418-92.351-61.574 13.07 4.453 27.206 6.886 41.96 6.886Z"
            clipRule="evenodd"
         />
         <Path
            fill="#2F9E41"
            fillRule="evenodd"
            d="M38.575 178.917C15.098 160.618 0 132.072 0 100 0 44.772 44.772 0 100 0c34.047 0 64.12 17.015 82.18 43.007-19.586 68.628-74.816 121.521-143.605 135.91Z"
            clipRule="evenodd"
         />
         <Path
            fill="#2F9E41"
            d="M70.752 56.257h63.782v12.512h-51.27v25.024h43.762v12.513H83.264v24.963h51.27v12.512H70.752V56.257Z"
         />
         <Path
            fill="#fff"
            d="M70.752 56.257v-5h-5v5h5Zm63.782 0h5v-5h-5v5Zm0 12.512v5h5v-5h-5Zm-51.27 0v-5h-5v5h5Zm0 25.024h-5v5h5v-5Zm43.762 0h5v-5h-5v5Zm0 12.513v5h5v-5h-5Zm-43.762 0v-5h-5v5h5Zm0 24.963h-5v5h5v-5Zm51.27 0h5v-5h-5v5Zm0 12.512v5h5v-5h-5Zm-63.782 0h-5v5h5v-5Zm0-82.524h63.782v-10H70.752v10Zm58.782-5v12.512h10V56.257h-10Zm5 7.512h-51.27v10h51.27v-10Zm-56.27 5v25.024h10V68.77h-10Zm5 30.024h43.762v-10H83.264v10Zm38.762-5v12.513h10V93.793h-10Zm5 7.513H83.264v10h43.762v-10Zm-48.762 5v24.963h10v-24.963h-10Zm5 29.963h51.27v-10h-51.27v10Zm46.27-5v12.512h10v-12.512h-10Zm5 7.512H70.752v10h63.782v-10Zm-58.782 5V56.257h-10v87.524h10Z"
         />
      </Svg>
   );
}
export default SvgComponent;
