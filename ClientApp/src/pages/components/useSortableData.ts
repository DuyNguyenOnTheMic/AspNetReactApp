import { useMemo, useState } from 'react'

const useSortableData = (items: any, config = null) => {
  const [sortConfig, setSortConfig] = useState<any>(config)

  const sortedItems = useMemo(() => {
    const sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }

        return 0
      })
    }

    return sortableItems
  }, [items, sortConfig])

  const requestSort = (key: string) => {
    let direction = 'descending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending'
    }
    setSortConfig({ key, direction })
  }

  return { items: sortedItems, requestSort, sortConfig }
}

export default useSortableData
