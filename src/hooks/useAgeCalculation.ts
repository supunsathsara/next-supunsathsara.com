import { useMemo } from "react";
import { differenceInYears, isToday } from "date-fns";

const useAgeCalculation = (birthDate: Date) => {
    const age = useMemo(
        () => differenceInYears(new Date(), birthDate),
        [birthDate]
    );

    const isBirthday = useMemo(
        () => isToday(birthDate),
        [birthDate]
    );

    return { age, isBirthday };
};

export default useAgeCalculation;
