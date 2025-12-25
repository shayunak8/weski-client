import { FC, useEffect } from 'react';
import Select from '../../select/select';
import { useSkiResorts } from '../../../hooks/useSkiResorts';

interface Props {
    onChange: (resortId: number) => void;
    value: number;
}

const ResortsSelect: FC<Props> = ({onChange, value}) => {
    const { resorts, loading, error } = useSkiResorts();

    useEffect(() => {
        if (resorts.length > 0 && !resorts.some(r => r.id === value)) {
            onChange(resorts[0].id);
        }
    }, [resorts, value, onChange]);

    if (loading) {
        return <div>Loading resorts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Select
            onChange={resortId => onChange(Number(resortId))} 
            value={value.toString()} 
            options={resorts.map(resort => ({label: resort.name, value: resort.id.toString()}))} 
        />
    );
}

export default ResortsSelect;