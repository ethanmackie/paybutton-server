import TableContainer, { compareNumericString } from 'components/TableContainer'
import { useMemo } from 'react'
import { PaymentDataByButton } from 'redis/dashboardCache'
import style from '../Transaction/transaction.module.css'
import moment from 'moment'
import { USD_QUOTE_ID } from 'constants/index'
import { formatQuoteValue } from 'utils'

interface IProps {
  buttons: PaymentDataByButton
  totalString: string
}

export default ({ buttons, totalString }: IProps): JSX.Element => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        id: 'name',
        accessor: 'displayData',
        Cell: (cellProps) => {
          return <div >
            <a href={`/button/${cellProps.cell.value.id as string}`}>{cellProps.cell.value.name}</a>
            </div>
        }
      },
      {
        Header: 'Last Payment Received',
        accessor: 'displayData.lastPayment',
        Cell: (cellProps) => {
          return <div >{moment(cellProps.cell.value * 1000).fromNow()}</div>
        }
      },
      {
        Header: () => (<div style={{ textAlign: 'right' }}>{totalString} Revenue</div>),
        accessor: 'total.revenue',
        id: 'revenue',
        sortType: compareNumericString,
        Cell: (cellProps) => {
          return <div style={{ textAlign: 'right', fontWeight: '600' }}>
            {'$'.concat(formatQuoteValue(cellProps.cell.value, USD_QUOTE_ID))}
          </div>
        }
      },
      {
        Header: () => (<div style={{ textAlign: 'right' }}>{totalString} Payments</div>),
        accessor: 'total.payments',
        Cell: (cellProps) => {
          return <div style={{ textAlign: 'right', fontWeight: '600' }}>{cellProps.cell.value}</div>
        }
      }
    ],
    [totalString]
  )
  const buttonList = Object.keys(buttons).map(k => buttons[k])
  return (
      <div>
        { buttons.length === 0
          ? <div className={style.transaction_ctn}>No buttons yet</div>
          : <TableContainer columns={columns} data={buttonList} opts={{ sortColumn: 'revenue' }}/>
        }
      </div>
  )
}
