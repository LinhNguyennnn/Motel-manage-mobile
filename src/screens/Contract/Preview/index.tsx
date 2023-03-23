import React, {useCallback} from 'react';
import {View, Modal, TouchableWithoutFeedback, Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import styles from './styles';

const WIDTH = 300;
const HEIGHT = 400;

type Props = {
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Preview: React.FC<Props> = ({preview, setPreview}) => {
  const onClose = useCallback(() => {
    setPreview(undefined);
  }, [setPreview]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={!!preview}
      onRequestClose={onClose}
      supportedOrientations={['portrait']}>
      <View style={styles.wrapperContent}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <ImageZoom
          cropWidth={WIDTH}
          cropHeight={HEIGHT}
          imageWidth={WIDTH}
          imageHeight={HEIGHT}
          minScale={1}>
          <Image
            style={{width: WIDTH, height: HEIGHT}}
            source={{
              uri: preview,
            }}
          />
        </ImageZoom>
      </View>
    </Modal>
  );
};

export default Preview;
