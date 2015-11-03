'use strict';

var today = (new Date()).toISOString().substring(0,10);
var date = new Date();

var month = date.getMonth();

var thisMonth = (month + 1) % 12;
var threeMonths = (month + 3) % 12;

var thisYear = date.getFullYear();
var nextYear =  thisYear + 1;

var thisYear_thisMonth = thisYear;
var thisYear_threeMonths = thisYear;

if(thisMonth > 9) {
  thisYear_threeMonths = thisYear + 1
}

if(thisMonth.toString().length < 2) {
  thisMonth = '0' + thisMonth;
} 
if(threeMonths.toString().length < 2) {
  threeMonths = '0' + threeMonths;
} 

if(thisYear.toString().length < 2) {
  thisYear = '0' + thisYear;
} 

if(nextYear.toString().length < 2) {
  nextYear = '0' + nextYear;
} 


module.exports = Object.freeze({
  'under 500': 'over=0&under=500',
  'under 1000': 'over=0&under=1000',
  'all prices': 'over=0',
  'next month': 'after=' + today + '&before=' + thisYear + '-'  + thisMonth + '-31',
  'next 3 months': 'after=' + today + '&before=' + thisYear_threeMonths + '-' + threeMonths + '-31',
  'this year': 'after=' + thisYear + '-01-01&before=' + thisYear + '-12-31',
  'next year': 'after=' + nextYear + '-01-01&before=' + nextYear + '-12-31',
})
