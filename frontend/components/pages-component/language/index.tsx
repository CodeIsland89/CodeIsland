import styled from 'styled-components';
import color from '../../../global/theme/color';
import Box from '../../shared-component/box';

const LanguageBlock = styled(Box)`
  width: 30rem;
  height: 9rem;
  margin: 2rem 0;
  border-radius: 0.2rem;
  box-shadow: 0.2rem 0.2rem 0.4rem ${color.grey_400};
`;

const Image = styled.div`
  width: 12rem;
  height: 9rem;
  background-color: ${color.grey_500};
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
`;

const Main = styled.div`
  box-sizing: border-box;
  --my: 1rem;
  --mx: 4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: calc(100% - 2 * var(--mx));
  height: calc(100% - 2 * var(--my));
  margin: var(--my) calc(var(--mx));
`;

export { LanguageBlock, Image, Main };
