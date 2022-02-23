import React, {useState, useEffect} from 'react';
import s from './App.module.css'
import Section from '../Section/Section';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Notification from '../Notification/Notification';


export default function App(){
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad ]= useState(0)

    const onLeaveFeedback = (event) => {
        switch(event.target.name){
            case 'good':
                setGood(state => state + 1);
                break;

            case 'neutral':
                setNeutral(state => state + 1);
                break

            case 'bad':
                setBad(state => state + 1);
                break;
            
            default: return;
        }
    }

    const countTotalFeedback = () => {
        return good + neutral + bad;
   }

   const countPositiveFeedbackPercentage = () => {
       const total = countTotalFeedback()
       const PositiveFeedbackPercentage = total ? Math.round((good / total) * 100) : 0;
       return PositiveFeedbackPercentage;
   }
   

    return (
        <div className={s.container}>
            <Section title="Please leave feedback">
            <FeedbackOptions
                options={['good', 'neutral', 'bad']}
                onLeaveFeedback={onLeaveFeedback}
            />
            </Section><Section title="Statistics">
            {countTotalFeedback() ? (
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    total={countTotalFeedback()}
                    positivePercentage={countPositiveFeedbackPercentage()}
                />
            ) : (<Notification message="There is no feedback" />)}
            </Section>
        </div>
    );
}