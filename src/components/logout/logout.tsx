import React, {FC, forwardRef, useImperativeHandle} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {logoutUserThunk} from "../../services/auth/thunks.ts";
import {resetRequestStatus} from "../../services/auth/slices.ts";
import Modal from "../modal/modal.tsx";
import Tooltip from "../tooltip/tooltip.tsx";

export interface ILogoutRefAttrs {
  handleLogout: () => void;
}

const Logout: FC<React.RefAttributes<Readonly<ILogoutRefAttrs>>> = forwardRef((_, ref) => {
  const dispatch = useAppDispatch();
  useImperativeHandle(ref, () => ({ handleLogout }));
  const {logoutRequestStatus: requestStatus} = useAppSelector(state => state.auth);

  const handleLogout = () => dispatch(logoutUserThunk())
  const handleCloseTooltip = () => dispatch(resetRequestStatus('logout'));

  let content;
  switch (requestStatus) {
    case 'idle' || 'succeeded':
      // No need to handle 'succeeded' case. A user will be redirected to home page as soon as logout is successful
      break;
    case 'pending':
      content = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text="Пожалуйста, подождите" showLoading />
        </Modal>
      );
      break;
    case 'failed':
      content = (
        <Modal onClose={handleCloseTooltip}>
          <Tooltip text='Не удалось выйти, попробуйте позже' />
        </Modal>
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
