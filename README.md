# Rice Variety Classification using Artificial Neural Networks (ANN)

This project implements a deep learning solution to classify five different varieties of rice using an Artificial Neural Network (ANN). The model is built using TensorFlow and Keras, achieving high accuracy in distinguishing between grain types based on image data.

##  Dataset Overview
The dataset contains 75,000 images of rice grains belonging to the following classes:
* Arborio
* Basmati
* Ipsala
* Jasmine
* Karacadag

##  Model Architecture
The solution uses a Feed-Forward Neural Network (ANN) with the following structure:
- **Input Layer:** Flattening $32 \times 32 \times 3$ RGB images into 3,072 features.
- **Hidden Layer 1:** 512 neurons (ReLU activation) + Dropout (0.3).
- **Hidden Layer 2:** 256 neurons (ReLU activation) + Dropout (0.3).
- **Hidden Layer 3:** 128 neurons (ReLU activation).
- **Output Layer:** 5 neurons (Softmax activation) for multi-class classification.

##  Installation & Usage

### Prerequisites
Make sure you have Python installed along with the following libraries:
```bash
pip install tensorflow numpy matplotlib seaborn scikit-learn
