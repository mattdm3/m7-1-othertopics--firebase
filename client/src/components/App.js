import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

import { AppContext } from './AppContext';
import { app } from 'firebase';

const App = () => {
  const { updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(AppContext);

  const sendInfoToDB = () => {

    updateUserData();

  }


  return (
    <StyledPageWrapper>
      <StyledHeader>

        {appUser && appUser.email ? (
          <>
            <StyledUserContainer>
              <Avatar src={appUser.photoUrl} />
              <p>
                {appUser.displayName} ({appUser.email})
            </p>
            </StyledUserContainer>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={sendInfoToDB}>PRESS TO ADD INFO TO DB</button>
          </>
        ) :
          (<button onClick={signInWithGoogle}>Sign In</button>)
        }

      </StyledHeader>
      <StyledContainer>{message}</StyledContainer>
    </StyledPageWrapper>
  );
};

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.nav`
  background: #eaeaea;
  padding: 6px 14px;
  min-height: 48px;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const StyledContainer = styled.div`
  background: #fafafa;
  min-height: 400px;
  padding: 14px;
`;

export default App;
