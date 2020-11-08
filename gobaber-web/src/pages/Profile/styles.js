import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder{
                color: rgba(255, 255, 255, 0.7)
            }
        }
        
        span {
            color: #fb6f91;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        hr {
            border: 0;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.2);
            margin: 10px 0 20px;
        }

        > button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: 0.4s;
            opacity: 0.8;
            &:hover {
                opacity: 1;
                color: #e8e8e8;
            }

        }

        a {
            color: #fff;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.8;  

            &:hover {
                opacity: 1;
            }

        }

    }

    > button {
        width: 100%;
        height: 44px;
        margin: 10px 0 0;
        background: #F64c75;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: 0.4s;
        opacity: 0.8;

        &:hover {
            opacity: 1;
            background-color: #de4368;
        }

    }

`;

export const Form = styled.form`

`;