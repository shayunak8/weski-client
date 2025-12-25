import { FC, useMemo } from 'react';
import Select from '../../select/select';
import { GROUP_SIZE } from '../../../constants/app.constants';
import './guestsSelect.scss';

interface GuestsSelectProps {
    onChange: (groupSize: number) => void;
    value: number;
}

const GuestsSelect: FC<GuestsSelectProps> = ({onChange, value}) => {
    const options = useMemo(() => {
        return Array.from({length: GROUP_SIZE.MAX}, (_, index) => {
            const count = index + 1;
            return {
                label: `${count} ${count === 1 ? 'person' : 'people'}`,
                value: count.toString(),
            };
        });
    }, []);

    return (
      <Select
        onChange={groupSize => onChange(Number(groupSize))} 
        value={value.toString()} 
        options={options} 
     />
    );
};

export default GuestsSelect;

