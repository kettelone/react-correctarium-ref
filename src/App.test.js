import moment from 'moment/moment.js'
import React from 'react'
import {
    finalResult, 
    priceAndTimeMultiplier, 
    getPrice, 
    getTime, 
    calculateResultDate
        } from './calculate'


describe('priceAndTimeMultiplier should', ()=>{
    test('return correct multiplier', ()=>{
        expect(priceAndTimeMultiplier('doc')).toBe(1)
        expect(priceAndTimeMultiplier('docx')).toBe(1)
        expect(priceAndTimeMultiplier('rtf')).toBe(1)
        expect(priceAndTimeMultiplier('pdf')).toBe(1.2)
        expect(priceAndTimeMultiplier('xls')).toBe(1.2)

    })
})


describe('getPrice should', ()=>{
    test('return correct price', ()=>{
        expect(getPrice(10, 'ru')).toBe('50.00')
        expect(getPrice(1333, 'ru')).toBe('66.65')
        expect(getPrice(3500, 'ru')).toBe('175.00')
        expect(getPrice(10, 'ua')).toBe('50.00')
        expect(getPrice(1333, 'ua')).toBe('66.65')
        expect(getPrice(3500, 'ua')).toBe('175.00')
        expect(getPrice(10, 'en')).toBe('120.00')
        expect(getPrice(1333, 'en')).toBe('159.96')
        expect(getPrice(3500, 'en')).toBe('420.00')

    })
})


describe('getTime should', ()=>{
    test('return correct time needed for order completion', ()=>{
        expect(getTime(10, 'ru')).toBe(3600000)
        expect(getTime(1333, 'ru')).toBe(5400000)
        expect(getTime(3500, 'ru').toFixed(0)).toBe('11252363')
        expect(getTime(10, 'ua')).toBe(3600000)
        expect(getTime(1333, 'ua')).toBe(5400000)
        expect(getTime(3500, 'ua').toFixed(0)).toBe('11252363')
        expect(getTime(10, 'en')).toBe(3600000)
        expect(getTime(333, 'en')).toBe(5400000)
        expect(getTime(3500, 'en').toFixed(0)).toBe('39637838')
    })
})


describe('calculateResultDate should return correct deadline', ()=>{
    test('should return correct deadline', ()=>{
    expect(calculateResultDate(1*3600000, moment('Friday, September 10, 2021 9:00 AM'))).toBe(moment('Friday, September 10, 2021 11:00 AM').valueOf())
    expect(calculateResultDate(1*3600000, moment('Friday, September 10, 2021 5:40 PM'))).toBe(moment('Friday, September 10, 2021 6:40 PM').valueOf())
    expect(calculateResultDate(1*3600000, moment('Saturday, September 11, 2021 6:50 PM'))).toBe(moment('Monday, September 13, 2021 11:00 AM').valueOf())
    expect(calculateResultDate(12*3600000, moment('Friday, September 10, 2021 8:00 PM'))).toBe(moment('Tuesday, September 14, 2021 1:00 PM').valueOf())
    expect(calculateResultDate(7*9*3600000, moment('Friday, September 10, 2021 2:00 PM'))).toBe(moment('Tuesday, September 21, 2021 2:00 PM').valueOf())

})
})