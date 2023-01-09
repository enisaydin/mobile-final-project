import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment-timezone'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const WeathItem = ({title, value, unit}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weathItemTitle}>{title}</Text>
            <Text style={styles.weathItemTitle}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({current, lat, lon, timezone}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursFormat < 10? '0'+hoursFormat : hoursFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])
    return (
        <View style={styles.container}>  
           <View>
               <View>
                   <Text style={styles.heading}>{time}</Text>
               </View>
               <View>
                   <Text style={styles.subheading}>{date}</Text>
               </View>
               <View style={styles.weathItemContainer}>
                    <WeathItem title="Humidity" value={current? current.humidity : ""} unit="%"/>
                    <WeathItem title="Pressure" value={current? current.pressure : ""} unit="hPA"/>
                    <WeathItem title="Sunrise" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} unit="am"/>
                    <WeathItem title="Sunset" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""} unit="pm"/>
               </View>
           </View>
           <View style={styles.rightAlign}>
               <Text style={styles.timezone}>{timezone}</Text>
               <Text style={styles.latlong}>{lat}N {lon}E</Text>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1.5,
        flexDirection:"row",
        justifyContent:'space-between',
        padding: 15
    },
    heading: {
        fontSize: 46,
        color:'white',
        fontWeight: '100'
    },
    subheading: {
        fontSize: 25,
        color: '#eee',
        fontWeight: '300'
    },
    rightAlign: {
        textAlign:'right',
        marginTop: 20
    },
    timezone: {
        fontSize: 21,
        color:'white'
    },
    latlong:{
        fontSize:15,
        color:'white',
        fontWeight: '700'
    },
    weathItemContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    }, 
    weathItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weathItemTitle: {
        color:'#eee',
        fontSize: 18,
        fontWeight: '100'
    }
})

export default DateTime
