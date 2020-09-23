import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { themed } from '../../styles/theme';
import { useTranslationContext } from '../../contexts/translationContext/TranslationContext';

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 27px;
  width: 112px;
  z-index: 10;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.colors.primary};
  transform: translateY(9px);
  ${({ theme }) => theme.messageList.messageNotification.container.css}
`;

const MessageNotificationText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  ${({ theme }) => theme.messageList.messageNotification.text.css}
`;

/**
 * @example ../docs/MessageNotification.md
 */
const MessageNotification = ({ onPress, showNotification = true }) => {
  const { t } = useTranslationContext();
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      duration: 500,
      toValue: showNotification ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [showNotification]);

  if (!showNotification) {
    return null;
  }

  return (
    <Animated.View
      style={{
        bottom: 0,
        opacity,
        position: 'absolute',
      }}
      testID='message-notification'
    >
      <Container onPress={onPress}>
        <MessageNotificationText>{t('New Messages')}</MessageNotificationText>
      </Container>
    </Animated.View>
  );
};

MessageNotification.themePath = 'messageList.messageNotification';

MessageNotification.propTypes = {
  /** Onclick handler */
  onPress: PropTypes.func.isRequired,
  /** If we should show the notification or not */
  showNotification: PropTypes.bool,
};

export default themed(MessageNotification);
