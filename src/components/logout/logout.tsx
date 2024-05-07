import React, {FC, forwardRef, useImperativeHandle} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {logoutUser} from "../../services/auth/thunks.ts";
import {resetRequestStatus} from "../../services/auth/slices.ts";
import Modal from "../modal/modal.tsx";
import Tooltip from "../tooltip/tooltip.tsx";

type LogoutProps = React.RefAttributes<{handleLogout: () => void}> & {}

const Logout: FC<LogoutProps> = forwardRef((_, ref) => {
  const dispatch = useAppDispatch();
  useImperativeHandle(ref, () => ({ handleLogout }));
  const {logoutRequestStatus: requestStatus} = useAppSelector(state => state.auth);

  const handleLogout = () => dispatch(logoutUser())
  const handleCloseTooltip = () => dispatch(resetRequestStatus('logout'));

  let content;
  switch (requestStatus) {
    case 'idle' || 'succeeded':
      // No need to handle 'succeeded' case. A user will be redirected to home page as soon as logout is successful
      break;
    case 'pending':
      content = (
        <Modal onClose={handleCloseTooltip}><Tooltip text="Пожалуйста, подождите" showLoading /></Modal>
      );
      break;
    case 'failed':
      content = (
        <Modal onClose={handleCloseTooltip}><Tooltip text='Не удалось выйти, попробуйте позже' /></Modal>
      );
      break;
  }
  return (
    <>
      {content}
    </>
  );
});

export default Logout;