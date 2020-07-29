/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SlickSlider from 'react-slick';
import styled from 'styled-components';

const Container = styled.ul`
    padding: 0;
    margin: 0;
    .slick-prev,
    .slick-next {
        z-index: 50;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 30px;
        height: 30px;
        transform: initial;
        
        &:before {
            font-size: 30px;
        }
    }

    .slick-prev {
        left: -40px;
    }
    .slick-next {
        right: 15px;
    }
    .slick-next::before, 
    .slick-prev::before {
	color: ${({ arrowColor }) => arrowColor};
    }

    @media (max-width: 800px) {
        .slick-prev {
            left: 5px;
        }
        .slick-next {
            right: 5px;
        }
    }
`;

export const SliderItem = styled.li`
    margin-right: 16px;
    img {
        margin: 16px;
        width: 298px;
        height: 197px;
        object-fit: cover;
    }
`;


const Slider = ({ arrowColor, children }) => (
    <Container arrowColor={arrowColor}>
        <SlickSlider {...{
            dots: false,
            infinite: true,
            speed: 300,
            centerMode: false,
            adaptiveHeight: true,
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        variableWidth: true,
                    }
                }
            ]
        }}
        >
        {children}
        </SlickSlider>
    </Container>
);

export default Slider; 
