import React, { useState, useContext, useRef, useEffect } from 'react';
import { ItemWrapper } from "./Item.style";
import { ThemeContext } from "../theme-context";
import PropTypes from "prop-types";

const MAX_LENGTH = 15;

function Item(props) {
    const { itemFontSize, fontFamily } = useContext(ThemeContext);
    const [isHovered, setIsHovered] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: props.data.x, y: props.data.y });

    const shortName = props.data.name.length > MAX_LENGTH ?
        props.data.name.substr(0, MAX_LENGTH) + "..." :
        props.data.name;

    const onMouseToggle = () => {
        setIsHovered(!isHovered);
    };

    useEffect(() => {
        if (props.animate) {
            setCoordinates({ x: props.data.x, y: props.data.y });
        }
    }, [props.data, props.animate]);

    return (
        <ItemWrapper
            className="blip"
            id={'blip-' + props.data.id}
            transform={`rotate(${props.rotateDegrees}) translate(${coordinates.x}, ${coordinates.y})`}
            onMouseEnter={onMouseToggle}
            onMouseLeave={onMouseToggle}
            style={{
                opacity: isHovered ? '1.0' : '0.7',
                fontWeight: isHovered ? "Bold" : "Normal",
                transition: props.animate ? 'transform 1s ease' : 'none' 
            }}
        >
            <circle r={"4px"} />
            <text
                className={"name"}
                dx={"7px"}
                dy={"7px"}
                fontSize={itemFontSize}
                fontFamily={fontFamily}
            >
                {isHovered ? props.data.name : shortName} ({props.profitAndLoss})
            </text>
        </ItemWrapper>
    );
}

Item.propTypes = {
    rotateDegrees: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    profitAndLoss: PropTypes.string,
    animate: PropTypes.bool
};

export default Item;
