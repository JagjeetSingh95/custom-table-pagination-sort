import { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './utils'
import { Pagination } from './Pagination'

export const Table = ({ columns, rows }) => {
  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 10

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSort = (accessor) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }

	const getStyle = (value, type) => {
		var percentage = value * 100 / 500000;
		if(type == 'width') {
			return percentage + '%';
		} else {
			if(percentage >= 60) {
				return '#15be08';
			} else if(percentage >= 40 && percentage < 60) {
				return '#ffa500';
			} else {
				return '#d31103'
			}
		}
	}

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return '⬆️'
                  }
                  return '⬇️'
                } else {
                  return '️↕️'
                }
              }
              return (
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row, index) => {
            return (
              <tr key={row.id}>
								<td>{row.name}</td>
								<td className="table-progress">
									<div>
										<div className="table-progress-content">
											<div style={{width: getStyle(row.sales, 'width'), background: getStyle(row.sales, 'background'), height: '20px'}}></div>
										</div>
										{row.sales.toLocaleString()}
									</div>
								</td>
								<td>${row.salary.toLocaleString()}</td>
								<td>{row.age}</td>
								<td>{row.start_date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      <div>
        <p>
          <button className="reset" onClick={clearAll}>Reset</button>
        </p>
      </div>
    </>
  )
}
