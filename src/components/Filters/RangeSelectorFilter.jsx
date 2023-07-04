import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import './RangeSelectorFilter.css'

const MultiRangeSlider = ({ min, max, onChange, className}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  // useEffect(() => {
  //   onChange({ min: minVal, max: maxVal });
  // }, [minVal, maxVal, onChange]);

  function setExtremes(setState,value, isMin)
  {
     if(isMin)
     {
      if(value < min)
        setState(min);
     }
     else
     {
      if(value > max)
        setState(max);
     }
  }

  return (
    <div className={`container ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          setMinVal((prevMinVal) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            minValRef.current = value;
            return value;
          });
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          setMaxVal((prevMaxVal) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            maxValRef.current = value;
            return value;
          });
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">
          <input
            value={minVal}
            min={min}
            max={max}
            style={{ width: "75px", height: "25px", marginLeft: "-10px" }}
            onChange={(e) => {
             setExtremes(setMinVal, parseInt(e.target.value), true)
            }}
            className="bg-blue-200 rounded p-2 m-2 border-2 border-black"
          />
        </div>
        <div className="slider__right-value">
          <input
            value={maxVal}
            min={min - 1}
            max={max}
            style={{ width: "75px", height: "25px", marginLeft: "-10px" }}
            onChange={(e) => {
              setExtremes(setMaxVal, parseInt(e.target.value), false)
            }}
            className="bg-blue-200 rounded p-2 m-2 border-2 border-black"
          />
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;
