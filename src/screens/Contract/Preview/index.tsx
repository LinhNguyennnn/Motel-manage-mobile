import React, {useCallback} from 'react';

import ImageZoom from 'react-native-image-pan-zoom';
import {
  View,
  Modal,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import styles from './styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height - 300;

type Props = {
  left: number;
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Preview: React.FC<Props> = ({left, preview, setPreview}) => {
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
          cropWidth={WIDTH - left}
          cropHeight={HEIGHT}
          imageWidth={WIDTH - left}
          imageHeight={HEIGHT}
          minScale={1}
          maxScale={1.7}>
          <Image
            style={{width: WIDTH - left, height: HEIGHT}}
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
