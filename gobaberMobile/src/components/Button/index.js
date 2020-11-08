import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container, Text} from './styles';

export default function Button({children, loading = false, ...rest}) {
    return (
        <Container {...rest}>
            {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text>{children}</Text>
            )}
        </Container>
    );
}
