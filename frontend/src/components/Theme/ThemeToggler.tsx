import React from 'react';
import { Switch, useColorMode, FormLabel, SwitchProps } from '@chakra-ui/react';

interface ThemeTogglerProps extends SwitchProps {
    showLabel?: boolean;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ showLabel = false, ...rest }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            {showLabel && (
                <FormLabel htmlFor="theme-toggler" mb={0}>
                    Enable Dark Theme
                </FormLabel>
            )}
            <Switch
                id="theme-toggler"
                size="sm"
                isChecked={colorMode === 'dark'}
                isDisabled={false}
                value={colorMode}
                colorScheme="blue"
                mr={2}
                onChange={toggleColorMode}
                {...rest}
            />
        </>
    );
};

export default ThemeToggler;
