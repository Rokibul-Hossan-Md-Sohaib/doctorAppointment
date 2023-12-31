import React from 'react';
import {Calendar} from 'react-native-calendars';

import {colors, fonts} from '../config';
/**
 * @param selectedDate : string
 * @param changeSelectedDate : callBack method when date is selected, it will be called and pass the selected date
 */
export default ({selectedDate, changeSelectedDate, minDate}) => {
  return (
    <Calendar
      onDayPress={day => {
        console.log('selected day', day);
        changeSelectedDate(day.dateString);
      }}
      minDate={minDate || Date()}
      // hideExtraDays={true}
      markedDates={{[selectedDate]: {selected: true}}}
      theme={{
        backgroundColor: colors.WHITE,
        calendarBackground: colors.WHITE,
        textSectionTitleColor: 'blue',
        selectedDayBackgroundColor: colors.PRIMARY,
        selectedDayTextColor: colors.WHITE,
        todayTextColor: colors.SUCCESS,
        dayTextColor: colors.BLACK,
        textDisabledColor: colors.GRAY,
        dotColor: '#00adf5',
        // selectedDotColor: 'red',
        arrowColor: colors.PRIMARY,

        disabledArrowColor: colors.GRAY,
        // monthTextColor: '#00adf5',
        indicatorColor: 'blue',
        textDayFontFamily: fonts.regular,
        textMonthFontFamily: fonts.regular,
        fontFamily: fonts.regular,
        // textDayFontWeight: '300',
        // textMonthFontWeight: 'bold',
        // textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
        'stylesheet.calendar.main': {
          container: {
            paddingVertical: 0,
            backgroundColor: colors.WHITE,
            borderRadius: 10,
          },
          monthView: {
            borderRadius: 10,
            backgroundColor: colors.WHITE,
            // shadowColor: colors.LIGHT_BLUE_GREY,
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.16,
            // shadowRadius: 2.62,
            // elevation: 4,
          },
        },
        'stylesheet.calendar.header': {
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 0,
            paddingRight: 0,
            marginHorizontal: 0,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 10,
            color: colors.WHITE,
            // marginTop: 6,
            alignItems: 'center',
            backgroundColor: colors.SECONDARY,
          },
          monthText: {
            color: colors.WHITE,
            fontFamily: fonts.semiBold,
            fontSize: 16,
          },

          week: {
            marginTop: 10,
            paddingHorizontal: 10,
            flexDirection: 'row',
            backgroundColor: colors.WHITE,
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: fonts.semiBold,
            fontSize: 11,
            color: colors.GRAY,
          },
          dayHeader: {
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'left',
            fontSize: 12,
            fontFamily: fonts.semiBold,
            fontWeight: '600',
            color: colors.GRAY,
          },
        },
      }}
    />
  );
};
