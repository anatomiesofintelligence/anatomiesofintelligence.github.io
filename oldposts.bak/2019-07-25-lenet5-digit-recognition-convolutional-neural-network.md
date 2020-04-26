---
title: LeNet-5 Convolutional Neural Network Architecture
layout: image
entry-type: image
image: l/lenet5-architecture.gif
entry-date: 2019-07-25
entry-by: Jonathan Reus
source-url: http://yann.lecun.com/exdb/publis/index.html#lecun-98
source: LeCun, Yann, et al. "Gradient-based learning applied to document recognition." Proceedings of the IEEE 86.11 (1998) 2278-2324.
copyright:
tags: [inscription, handwriting, hands, gradient descent, convolutional neural network, cnn, mnist, model, architecture]
weights: [0.03, 0.54, 0.05, 0.12, 0.932, 0.932, 0.654, 0.778, 0.933]

summary: "Architecture of LeNet-5, a Convolutional Neural Network, in this paper used for handwritten digit recognition. Each plane is a feature map, i.e. a set of units whose weights are constrained to be identical. LeNet-5 comprises 7 layers, not counting the input, all of which contain trainable parameters (weights). The input is a 32x32 pixel image. This is significantly larger than the largest character in the (MNIST) database (at most 20x20 pixels centered in a 28x28 field). The reason is that it is desirable that potential distinctive features such as stroke end-points or corner can appear in the center of the receptive field of the highest-level feature detectors.

In LeNet-5 the set of centers of the receiptive fields of the last convolutional layer form a 20x20 area in the center of the 32x32 input. The values of the input pixels are normalized so that the background level (white) corresponds to a value of -0.1 and the foreground (black) corresponds to 1.175. This makes the mean input roughly 0, and the variance roughly 1 which accelerates learning."
---
