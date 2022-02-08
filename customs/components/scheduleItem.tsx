import { Box, Text } from "@chakra-ui/react"
import { fmtTime, fmtDate, fmtDay } from "@utils/dateUtils"
import { primaryColorHex } from "customs/theme/styles"
import { FC } from "react"
import { Schedule } from "../types"

interface ScheduleItemProps {
    schedule: Schedule
    onSelectSchedule: (s: Schedule) => void
    selectedDates: string[]
}
const ScheduleItem: FC<ScheduleItemProps> = ({ schedule, onSelectSchedule, selectedDates }) => {
    const selected = !!selectedDates.find(d => d === schedule.date)
    const onSelectScheduleItem = () => {
        onSelectSchedule(schedule)
    }

    return (
        <Box
            shadow={"xl"}
            p={8} pos="relative"
            w={{ base: "100%", md: "fit-content" }}
            bg={selected ? primaryColorHex : 'white'}
            color={selected ? 'white' : 'black'}
            _notFirst={{
                ml: { base: 0, md: "3em" },
                mt: { base: "1em", md: 0 },
            }}
            transition={"all .3s ease"}
            cursor={"pointer"}
            _hover={{
                transform: "skewY(-1.5deg) scale(1.1)",
            }}
            onClick={onSelectScheduleItem}
            borderRadius={"xl"}
        >
            <Text fontSize={"1.5em"}>{fmtTime(schedule.date)}</Text>
            <Text fontWeight={"bold"}>{fmtDate(schedule.date)}</Text>
            <Text pos="absolute" top="1em" right="1em" variant="dayLabel">{fmtDay(schedule.date)}</Text>
        </Box>
    )
}

export default ScheduleItem