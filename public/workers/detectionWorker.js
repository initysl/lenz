let model = null;

self.addEventListener('message', async (e) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'LOAD_MODEL':
      try {
        // Import TensorFlow.js in worker
        importScripts(
          'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js',
        );
        importScripts(
          'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js',
        );

        model = await cocoSsd.load();
        self.postMessage({ type: 'MODEL_LOADED' });
      } catch (error) {
        self.postMessage({ type: 'MODEL_ERROR', error: error.message });
      }
      break;

    case 'DETECT':
      if (!model) {
        self.postMessage({ type: 'ERROR', error: 'Model not loaded' });
        return;
      }

      try {
        const { imageData, width, height } = payload;

        // Create ImageData from transferred data
        const imgData = new ImageData(
          new Uint8ClampedArray(imageData),
          width,
          height,
        );

        // Run detection
        const predictions = await model.detect(imgData);

        self.postMessage({
          type: 'DETECTIONS',
          predictions,
        });
      } catch (error) {
        self.postMessage({ type: 'ERROR', error: error.message });
      }
      break;
  }
});
