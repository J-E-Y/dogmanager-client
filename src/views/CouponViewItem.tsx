import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CouponViewData } from '../modules/coupon';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

//////////////////////////////////////////////////////////////////////////////////////

interface CouponViewItemProps {
  coupon: CouponViewData;
}

const CouponViewItem: React.FunctionComponent<CouponViewItemProps> = ({
  coupon,
}: CouponViewItemProps) => {
  function eventTime(stringTime: string | undefined) {
    if (stringTime === '') return;
    if (stringTime !== undefined) {
      return `${stringTime.slice(0, 4)}.${stringTime.slice(4, 6)}.${stringTime.slice(
        6,
        8,
      )}. ${stringTime.slice(8, 10)}:${stringTime.slice(10, 12)}`;
    }
  }

  function convertToStr() {
    let word: any;
    const stateUserCoupon = coupon.couponState;
    if (Number(stateUserCoupon) === 0) {
      word = '사용가능';
    } else if (Number(stateUserCoupon) === 1) {
      word = '사용완료';
    } else if (Number(stateUserCoupon) === 2) {
      word = '취소됨';
    }
    return word;
  }
  return (
    <TableRow>
      <TableCell>{coupon.userName}</TableCell>
      <TableCell>{coupon.userEmail}</TableCell>
      <TableCell>{coupon.couponCode}</TableCell>
      <TableCell>{eventTime(coupon.assignedAt)}</TableCell>
      <TableCell>{eventTime(coupon.expiredAt)}</TableCell>
      <TableCell>{convertToStr()}</TableCell>
    </TableRow>
  );
};

export default CouponViewItem;
