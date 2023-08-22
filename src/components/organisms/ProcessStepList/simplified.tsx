import { useTranslation } from 'react-i18next';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import { ProcessStep } from '@/models/processSteps';

import { formatDate } from '@/utils';
import { PRIMARY_LIGHT, RED } from '@/theme';
import styles from './styles';

interface SimplifiedViewProps {
   processSteps: Array<ProcessStep>;
   // eslint-disable-next-line react/require-default-props
   timeline?: boolean;
}

export default function SimplifiedView({
   processSteps,
   timeline = false,
}: SimplifiedViewProps) {
   const theme = useTheme();
   const { t } = useTranslation('processSteps');

   function getTimelineStyles(
      step: ProcessStep,
      stepNumber: number,
   ): StyleProp<TextStyle> {
      const isPast = new Date(step.deadline).getTime() < Date.now();
      const alreadyDone = step.isApplied && isPast;

      const { length } = processSteps;
      const failed =
         (stepNumber !== length && alreadyDone) || (!isPast && !step.isApplied);

      let color = '';
      if (failed) color = RED;
      else if (alreadyDone) color = theme.colors.primary;
      else color = 'black';

      return {
         fontSize: 18,
         textDecorationLine: alreadyDone ? 'line-through' : 'none',
         color,
      };
   }

   function renderDate(deadline: string, onlyOnDeadline: boolean) {
      const date = formatDate(deadline);
      if (onlyOnDeadline) return t('labels.deadline.on', { date });

      return t('labels.deadline.until', { date });
   }

   function renderTitle(step: ProcessStep, stepNumber: number) {
      let timelineStyles: StyleProp<TextStyle> = {};
      if (timeline) timelineStyles = getTimelineStyles(step, stepNumber);

      return (
         <View
            style={[
               styles.titleContainer,
               { maxWidth: timeline ? '75%' : 'auto' },
            ]}
         >
            <Text
               style={[styles.title, timelineStyles]}
               numberOfLines={timeline ? 1 : 2}
            >
               {`${stepNumber}. ${step.title}`}
            </Text>
            <Text style={[styles.title, timelineStyles]}>{` (${renderDate(
               step.deadline,
               step.onlyOnDeadline,
            )})`}</Text>
         </View>
      );
   }

   function renderDescription(step: ProcessStep) {
      if (timeline) return null;

      return <Text style={styles.description}>{step.description}</Text>;
   }

   function renderTimeline(step: ProcessStep, currentIndex: number) {
      if (!timeline) return null;

      const isPast = new Date(step.deadline).getTime() < Date.now();
      const alreadyDone = step.isApplied && isPast;

      const { length } = processSteps;
      const failed =
         (currentIndex !== length - 1 && alreadyDone) ||
         (!isPast && !step.isApplied);

      let iconStyles: {
         icon: IconSource;
         background: string;
         borderColor: string;
         iconColor: string;
      } = {} as any;

      if (failed) {
         iconStyles = {
            icon: 'close',
            background: RED,
            borderColor: RED,
            iconColor: 'white',
         };
      } else if (alreadyDone) {
         iconStyles = {
            icon: 'check-bold',
            background: theme.colors.primary,
            borderColor: theme.colors.primary,
            iconColor: 'white',
         };
      } else {
         iconStyles = {
            icon: 'circle-small',
            background: 'white',
            borderColor: PRIMARY_LIGHT,
            iconColor: 'white',
         };
      }

      const notFirstStep = currentIndex > 0;
      return (
         <View style={styles.stepUserIcon}>
            {notFirstStep && (
               <View
                  style={[
                     styles.stepUserLine,
                     {
                        backgroundColor: PRIMARY_LIGHT,
                     },
                  ]}
               />
            )}
            <IconButton
               style={{
                  borderWidth: 2,
                  borderRadius: 100,
                  borderColor: iconStyles.borderColor,
                  backgroundColor: iconStyles.background,
                  marginBottom: notFirstStep ? 0 : -32,
               }}
               icon={iconStyles.icon}
               iconColor={iconStyles.iconColor}
            />
         </View>
      );
   }

   const timelineContainerStyles: StyleProp<ViewStyle> = {
      marginBottom: 32,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
   };
   return processSteps.map((step, index) => (
      <View
         key={step.id}
         style={[
            styles.simplifiedContainer,
            timeline ? timelineContainerStyles : {},
         ]}
      >
         {renderTitle(step, index + 1)}
         {renderDescription(step)}
         {renderTimeline(step, index)}
      </View>
   ));
}
