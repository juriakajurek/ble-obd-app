import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, PanResponder, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import {setDy, setDx} from '../actions/actions';
// import {Easing} from 'react-native-reanimated';
const CUBE_SIZE = 74;

const Cube = props => {
  const dx = useSelector(state => state.box.dx);
  const dy = useSelector(state => state.box.dy);
  const isTraveling = useSelector(state => state.box.isTraveling);
  const dispatch = useDispatch;

  useEffect(() => {
    roll();
  });

  const roll = () => {
    const origin = {x: 0, y: 0, z: -CUBE_SIZE};
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    refViewFront.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    refViewBack.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    refViewRight.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    refViewLeft.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    refViewTop.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    refViewBottom.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });
  };

  const rotateXY = (dx, dy) => {
    const radX = (Math.PI / 180) * dy;
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);

    const radY = (Math.PI / 180) * -dx;
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    return [
      cosY,
      sinX * sinY,
      cosX * sinY,
      0,
      0,
      cosX,
      -sinX,
      0,
      -sinY,
      cosY * sinX,
      cosX * cosY,
      0,
      0,
      0,
      0,
      1,
    ];
  };

  const rotateXZ = (dx, dy) => {
    const radX = (Math.PI / 180) * dx;
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);

    const radY = (Math.PI / 180) * dy;
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    return [
      cosX,
      -cosY * sinX,
      sinX * sinY,
      0,
      sinX,
      cosX * cosY,
      -sinY * cosX,
      0,
      0,
      sinY,
      cosY,
      0,
      0,
      0,
      0,
      1,
    ];
  };

  // let rotZ = useRef(new Animated.Value(0)).current;
  // let scale = useRef(new Animated.Value(1)).current;
  // const spin = rotZ.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });

  // const wink = () => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(scale, {
  //         toValue: 1.1,
  //         duration: 1500,
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(scale, {
  //         toValue: 1,
  //         duration: 1500,
  //         useNativeDriver: false,
  //       }),
  //     ])
  //   ).start();
  // };

  const transformOrigin = (matrix, origin) => {
    const {x, y, z} = origin;

    const translate = MatrixMath.createIdentityMatrix();
    MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
    MatrixMath.multiplyInto(matrix, translate, matrix);

    const untranslate = MatrixMath.createIdentityMatrix();
    MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
    MatrixMath.multiplyInto(matrix, matrix, untranslate);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState);

        const {dx, dy} = gestureState;
        const origin = {x: 0, y: 0, z: -CUBE_SIZE};
        let matrix = rotateXY(dx, dy);
        transformOrigin(matrix, origin);
        refViewFront.setNativeProps({
          style: {transform: [{perspective: 1000}, {matrix: matrix}]},
        });

        matrix = rotateXY(dx + 180, dy);
        transformOrigin(matrix, origin);
        refViewBack.setNativeProps({
          style: {transform: [{perspective: 1000}, {matrix: matrix}]},
        });

        matrix = rotateXY(dx + 90, dy);
        transformOrigin(matrix, origin);
        refViewRight.setNativeProps({
          style: {transform: [{perspective: 1000}, {matrix: matrix}]},
        });

        matrix = rotateXY(dx - 90, dy);
        transformOrigin(matrix, origin);
        refViewLeft.setNativeProps({
          style: {transform: [{perspective: 1000}, {matrix: matrix}]},
        });

        matrix = rotateXZ(dx, dy - 90);
        transformOrigin(matrix, origin);
        refViewTop.setNativeProps({
          style: {transform: [{perspective: 1000}, {matrix: matrix}]},
        });

        matrix = rotateXZ(-dx, dy + 90);
        transformOrigin(matrix, origin);
        refViewBottom.setNativeProps({
          style: {transform: [{perspective: 1000}, {matrix: matrix}]},
        });
      },
    })
  ).current;

  const renderLeft = color => {
    return (
      <View
        ref={component => (refViewRight = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : nul]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderRight = color => {
    return (
      <View
        ref={component => (refViewLeft = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderFront = color => {
    return (
      <View
        ref={component => (refViewFront = component)}
        style={[
          styles.rectangle,
          styles.front,
          color ? {backgroundColor: color} : null,
        ]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderBack = color => {
    return (
      <View
        ref={component => (refViewBack = component)}
        style={[
          styles.rectangle,
          styles.back,
          color ? {backgroundColor: color} : null,
        ]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderTop = color => {
    return (
      <View
        ref={component => (refViewTop = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderBottom = color => {
    return (
      <View
        ref={component => (refViewBottom = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          // {
          //   transform: [{scale: scale}],
          // },
        ]}>
        {renderFront('rgba(0,0,0,0.8)')}
        {renderBack('rgba(0,0,0,0.8)')}
        {renderLeft('rgba(0,0,0,0.8)')}
        {renderRight('rgba(0,0,0,0.8)')}
        {renderTop('rgba(0,0,0,0.8)')}
        {renderBottom('rgba(0,0,0,0.8)')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 2 * CUBE_SIZE,
    height: 2 * CUBE_SIZE,
    backgroundColor: 'transparent',
  },
  rectangle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 1.9 * CUBE_SIZE,
    height: 1.9 * CUBE_SIZE,
    zIndex: 100,
    borderRadius: 15,
  },
});

export default Cube;
