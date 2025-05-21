import styled from 'styled-components'

 const Input = styled.input`
    padding: 1.2rem 1.6rem;
    font-size: 1.6rem;
    border: 1px solid var(--color-grey-200);
    border-radius: 7px;
    width: 100%;
    color: var(--color-grey-700);
    background-color: var(--color-grey-0);
    transition: border-color 0.2s;
    outline: none;
    
    &:focus {
        border-color: var(--color-primary-500);
    }
    `;
export default Input;