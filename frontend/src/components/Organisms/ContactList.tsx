import styled from 'styled-components';

interface IProps_ContactList {
  ContactList: Array<string>
  name : string
}

const ContactList = ({
  ContactList,
  name
}: IProps_ContactList) => {
  return (
    <ContactDiv>
      {ContactList.map((data: any) => {
        if (name === data.type) {
          return (
            <>
              <ContactP>{data.content}</ContactP>
              <hr />
            </>
          )
        }
        return (<></>)
      })}
    </ContactDiv>
  );
};

const ContactDiv = styled.div`
  text-align: center;
  line-height: 1.5;
`

const ContactP = styled.p`
  font-weight: 400;
  font-size: 1rem;
  margin-top: 0.5rem;
`
export default ContactList;
