import styled from 'styled-components';

export const VideoCardContainer = styled.a`
  border: 2px solid;
  border-radius: 4px;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  color: white;
  flex: 0 0 298px;
  width: 298px;
  height: 170px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  transition: opacity .3s;
  transition: all .3s;

  &:hover,
	&:focus {
		opacity: .8;
		transform: scale(0.98);
		box-shadow: 0 0 0 1px var(--white);
		outline: none;
	}
  
  &:not(:first-child) {
    margin-left: 20px;
  }

  .description {
		background: rgba(0, 0, 0, .5);
		width: 100%;
		height: 60px;
		color: var(--white);
		display: flex;
		align-items: center;
		padding: 10px;
		transform: translateY(60px);
		transition: transform linear 200ms;
		opacity: 0;
  }
  
	&:hover .description,
	&:focus .description {
		transform: translateY(0);
		opacity: 1;
	}
`;
