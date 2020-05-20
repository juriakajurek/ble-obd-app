import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, PanResponder} from 'react-native';

import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

const Cube = props => {
  const [dx, setDx] = useState(1);
  const [dy, setDy] = useState(1);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!rolling) {
      if (props.isTravelling) {
        this._interval = setInterval(() => {
          setDx(dx => dx + 2);
          setDy(dy => dy + 2);
          roll();
        }, 10);
        setRolling(true);
      }
    } else {
      if (!props.isTravelling) {
        clearInterval(this._interval);
        setRolling(false);
      }
    }
  });

  const roll = () => {
    const origin = {x: 0, y: 0, z: -49};

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

    props.setTravelling(false);
    props.setTravelling(true); // only for rerender :(
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
        const origin = {x: 0, y: 0, z: -49};
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
    }),
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
    <View style={styles.container}>
      {/* {renderFront()')}
        {renderBack()}
        {renderLeft()}
        {renderRight()}
        {renderTop()}
        {renderBottom()} */}

      {renderFront('rgba(0,0,0,0.8)')}
      {renderBack('rgba(0,0,0,0.8)')}
      {renderLeft('rgba(0,0,0,0.8)')}
      {renderRight('rgba(0,0,0,0.8)')}
      {renderTop('rgba(0,0,0,0.8)')}
      {renderBottom('rgba(0,0,0,0.8)')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    marginTop: 100,
    backgroundColor: 'transparent',
  },
  white: {
    color: 'white',
  },
  rectangle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 94,
    height: 94,
    zIndex: 100,
    borderRadius: 15,
  },
});

export default Cube;
