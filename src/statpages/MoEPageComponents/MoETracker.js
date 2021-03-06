import React, { useState, useEffect, useCallback, useContext } from "react";
import { Icon } from "react-icons-kit";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { chevronDown } from "react-icons-kit/feather/chevronDown";
import { arrowDown } from "react-icons-kit/feather/arrowDown";
import { arrowUp } from "react-icons-kit/feather/arrowUp";
import {
    useTable,
    usePagination,
    useSortBy,
    useFilters,
    useExpanded,
    useGlobalFilter,
} from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";
import { ThemeContext, ServerContext } from "../../context";
import MoEGraph from "./MoEGraph";
import { Pagination } from "../../components";
import {
    ClassFilter,
    GlobalFilter,
    MoETierFilter,
    NationFilter,
    PremFilter,
    arrayFilterFn,
} from "../../components/tableFilters";
import {
    ButtonFiltersContainer,
    FiltersContainer,
    StyledTable,
    SubRow,
    TableContainer,
} from "../../components/tableComponents";

const backend = process.env.REACT_APP_BACKEND;

const MoEConv = {
    95: "3",
    85: "2",
    65: "1",
};

function MoETracker(props) {
    const { theme } = useContext(ThemeContext);
    const { server } = useContext(ServerContext);

    let data = props.data;

    // Define a default UI for filtering
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length;
        return (
            <input
                value={filterValue || ""}
                onChange={(e) => {
                    setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${count} records...`}
            />
        );
    }

    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, {
            keys: [(row) => row.values[id]],
        });
    }

    // Let the table remove the filter if the string is empty
    fuzzyTextFilterFn.autoRemove = (val) => !val;

    function Table({ columns, data }) {
        const filterTypes = React.useMemo(
            () => ({
                // Add a new fuzzyTextFilterFn filter type.
                fuzzyText: fuzzyTextFilterFn,
                // Or, override the default text filter to use
                // "startWith"
                text: (rows, id, filterValue) => {
                    return rows.filter((row) => {
                        const rowValue = row.values[id];
                        return rowValue !== undefined
                            ? String(rowValue)
                                  .toLowerCase()
                                  .startsWith(String(filterValue).toLowerCase())
                            : true;
                    });
                },
            }),
            []
        );

        const defaultColumn = React.useMemo(
            () => ({
                // Let's set up our default Filter UI
                Filter: DefaultColumnFilter,
                // And also our default editable cell
            }),
            []
        );

        // Use the state and functions returned from useTable to build your UI
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            state,
            visibleColumns,
            page, // Instead of using 'rows', we'll use page,
            // which has only the rows for the active page
            // The rest of these things are super handy, too ;)
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            preGlobalFilteredRows,
            setGlobalFilter,
            state: { pageIndex, pageSize },
        } = useTable(
            {
                columns,
                data,
                defaultColumn, // Be sure to pass the defaultColumn option
                filterTypes,
                initialState: {
                    // hiddenColumns: ["isPrem"],
                    pageIndex: 0,
                    pageSize: 100,
                    sortBy: [
                        {
                            id: `7percent${props.moe}`,
                            desc: false,
                        },
                    ],
                },
            },
            useFilters, // useFilters!
            useGlobalFilter, // useGlobalFilter!
            useSortBy,
            useExpanded,
            usePagination
        );

        function SubRows({ data }) {
            if (data) {
                return (
                    <div
                        style={{
                            backgroundColor:
                                theme === "dark"
                                    ? "rgb(40, 40, 40)"
                                    : "rgb(255, 255, 255)",
                            marginLeft: "-0.5rem",
                        }}
                    >
                        <MoEGraph data={data} />
                    </div>
                );
            } else {
                return <div style={{ padding: "0.3rem" }}>Loading...</div>;
            }
        }

        function SubRowAsync({ row, rowProps, visibleColumns }) {
            const [data, setData] = useState();
            useEffect(() => {
                async function get() {
                    fetch(
                        `${backend}/api/abcd/moetank/${row.original.id}/${server}`
                    )
                        .then((res) => res.json())
                        .then((res) => setData(res));
                }

                get();
            }, [row.original.id]);

            return <SubRows data={data} />;
        }

        const renderRowSubComponent = useCallback(
            ({ row, rowProps, visibleColumns }) => (
                <SubRowAsync
                    row={row}
                    rowProps={rowProps}
                    visibleColumns={visibleColumns}
                />
            ),
            []
        );

        // Render the UI for your table
        return (
            <>
                <FiltersContainer>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    {headerGroups.map((headerGroup, i) => (
                        <ButtonFiltersContainer key={i}>
                            {headerGroup.headers.map(
                                ({ disableFilters, render }, i) =>
                                    !disableFilters && (
                                        <span key={i}>{render("Filter")}</span>
                                    )
                            )}
                        </ButtonFiltersContainer>
                    ))}
                </FiltersContainer>
                <StyledTable theme={theme} {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <Icon
                                                        size={16}
                                                        icon={arrowDown}
                                                    />
                                                ) : (
                                                    <Icon
                                                        size={16}
                                                        icon={arrowUp}
                                                    />
                                                )
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <React.Fragment key={i}>
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps({
                                                style: setColor(cell.column.Header, cell.value)
                                            })}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                    {row.isExpanded ? (
                                        <SubRow theme={theme}>
                                            <td colSpan={visibleColumns.length}>
                                                {renderRowSubComponent({ row })}
                                            </td>
                                        </SubRow>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </StyledTable>
                <Pagination
                    pageSizes={[100, 250, 500]}
                    {...{
                        canPreviousPage,
                        canNextPage,
                        pageOptions,
                        pageCount,
                        gotoPage,
                        nextPage,
                        previousPage,
                        setPageSize,
                        pageIndex,
                        pageSize,
                    }}
                />
            </>
        );
    }

    // Define a custom filter filter function!
    function filterGreaterThan(rows, id, filterValue) {
        return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue >= filterValue;
        });
    }

    function setColor(column, value) {
        let backgroundColor = ""
        let color = "black";
        if (column === `7 Day %Δ`) backgroundColor = colorScale(value, 50);
        else if (column === `14 Day %Δ`) backgroundColor = colorScale(value, 30);
        else if (column === `30 Day %Δ`) backgroundColor = colorScale(value, 20);
        else color = undefined;
        return {
            color: color,
            backgroundColor: backgroundColor
        }
    }

    function colorScale(val, multiplier) {
        function green(val) {
            val *= -1;
            return `rgb(${255 - val * multiplier}, 255, ${
                255 - val * multiplier
            })`;
        }

        function red(val) {
            return `rgb(255,${255 - val * multiplier}, ${
                255 - val * multiplier
            })`;
        }

        return val > 0 ? red(val) : green(val);
    }

    function percentStyle(val) {
        return (
            <div>
                {val > 0 ? "+" : ""}
                {val}%
            </div>
        );
    }

    // This is an autoRemove method on the filter function that
    // when given the new filter value and returns true, the filter
    // will be automatically removed. Normally this is just an undefined
    // check, but here, we want to remove the filter if it's not a number
    filterGreaterThan.autoRemove = (val) => typeof val !== "number";
    const columns = React.useMemo(
        () => [
            {
                // Make an expander cell
                Header: () => null, // No header
                id: "expander", // It needs an ID
                Cell: ({ row }) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? (
                            <Icon size={24} icon={chevronDown} />
                        ) : (
                            <Icon size={24} icon={chevronRight} />
                        )}
                    </span>
                ),
                disableFilters: true,
            },
            {
                Cell: ({ value }) => {
                    return (
                        <img
                            src={require(`../../assets/flagIcons/${value}.png`)}
                            style={{ maxWidth: "40px" }}
                            alt={value}
                        />
                    );
                },
                Header: "Nation",
                accessor: "nation",
                Filter: NationFilter,
                filter: arrayFilterFn,
            },
            {
                Header: "Tier",
                accessor: "tier",
                Filter: MoETierFilter,
                filter: arrayFilterFn,
            },
            {
                Cell: ({ value }) => {
                    return (
                        <img
                            src={require(`../../assets/classIcons/${value}.png`)}
                            style={{ maxWidth: "20px"}}
                            alt={value}
                        />
                    );
                },
                Header: "Class",
                accessor: "class",
                Filter: ClassFilter,
                filter: arrayFilterFn,
            },
            {
                Cell: ({ value }) => {
                    return (
                        <img
                            src={require(`../../assets/tankIcons/${value}.png`)}
                            alt={value}
                        />
                    );
                },
                Header: "",
                accessor: "id",
                disableFilters: true,
            },
            {
                Header: "Name",
                accessor: "name",
                disableFilters: true,
            },
            {
                Header: `${MoEConv[props.moe]} MoE Reqs`,
                accessor: `${props.moe}`,
                disableFilters: true,
            },
            {
                Header: "7 Day Δ",
                accessor: `7diff${props.moe}`,
                disableFilters: true,
                sortType: "basic",
            },
            {
                Cell: ({ value }) => percentStyle(value),
                Header: "7 Day %Δ",
                accessor: `7percent${props.moe}`,
                disableFilters: true,
                sortType: "basic",
            },
            {
                Header: "14 Day Δ",
                accessor: `14diff${props.moe}`,
                disableFilters: true,
                sortType: "basic",
            },
            {
                Cell: ({ value }) => percentStyle(value),
                Header: "14 Day %Δ",
                accessor: `14percent${props.moe}`,
                disableFilters: true,
                sortType: "basic",
            },
            {
                Header: "30 Day Δ",
                accessor: `30diff${props.moe}`,
                disableFilters: true,
                sortType: "basic",
            },
            {
                Cell: ({ value }) => percentStyle(value),
                Header: "30 Day %Δ",
                accessor: `30percent${props.moe}`,
                disableFilters: true,
                sortType: "basic",
            },
            {
                Header: "",
                accessor: "isPrem",
                Filter: PremFilter,
                filter: arrayFilterFn,
            },
        ],
        [props.moe]
    );

    return (
        <TableContainer theme={theme}>
            <Table columns={columns} data={data} />
        </TableContainer>
    );
}

export default MoETracker;
