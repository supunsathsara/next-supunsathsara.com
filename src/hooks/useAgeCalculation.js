import { useState, useEffect } from "react";
import { differenceInYears, isToday } from "date-fns";

const useAgeCalculation = (birthDate) => {
    const [age, setAge] = useState(22);
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        const calculatedAge = differenceInYears(new Date(), birthDate);
        setAge(calculatedAge);
        setIsBirthday(isToday(birthDate));
    }, [birthDate]);

    return { age, isBirthday };
};

export default useAgeCalculation;
