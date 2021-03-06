import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListView, Row, Col, DropdownKebab, MenuItem } from 'patternfly-react';

import { BrushIcon, BugIcon, ShareIcon, ServerIcon } from '@patternfly/react-icons';
import { Button } from '@patternfly/react-core';

import { Pagination, Table } from '@red-hat-insights/insights-frontend-components';

import flatten from 'lodash/flatten'

import Actions from './Actions';

import { loadEntities, selectEntity, expandEntity, sortEntities, pageAndSize } from '../../redux/actions/entity_list';
import DetailView from '../../PresentationalComponents/DetailView/DetailView';

class EntityListView extends React.Component {
    constructor(props) {
        super(props);

        this.onRowClick = this.onRowClick.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.onSort = this.onSort.bind(this)
        this.onExpandClick = this.onExpandClick.bind(this)
        this.onSetPage = this.onSetPage.bind(this);
        this.onPerPageSelect = this.onPerPageSelect.bind(this);

        this.columns = ['Provider', 'Status', 'Type', 'Last Updated']
        this.realColumns = ['name', null, 'type', null]

        this.state = {
            itemsPerPage: 10,
            onPage: 1,
            sortBy: {}
            //    index: '0',
            //    direction: 'up',
            //}
        }
    }

    componentDidMount() {
        this.props.loadEntities();
    }

    onRowClick(_event, key, application) {
        console.log('onRowClick', key, application);
    }

    onItemSelect(_event, key, checked) {
        console.log('onItemSelect', key, checked);
        this.props.selectEntity(key, checked);
    }

    onSort(_event, key, direction) {
        console.log('onSort', key, this.columns[key], direction);
        this.props.sortEntities(this.realColumns[key], direction);
        this.setState({
            sortBy: {
              index: key,
              direction: direction,
            }
        });
    }

    onExpandClick(_event, _row, rowKey) {
        console.log('onExpandClick', _row, rowKey);
        this.props.expandEntity(rowKey, true);
    }

    onSetPage(number) {
        console.log('onSetPage', number);
        this.setState({
            onPage: number,
        });
        this.props.pageAndSize(number, this.state.itemsPerPage);
    }

    onPerPageSelect(count) {
        console.log('onPerPageSelect', count);
        this.setState({
            onPage: 1,
            itemsPerPage: count
        });
        this.props.pageAndSize(1, count);
    }

    render() {
        const { entities, rows } = this.props;
        const data = flatten(entities.map((item, index) => (
          [
            {
              ...item,
              children: [index + 1],
              cells: [
                item.name,
                'OK',
                item.type,
                (new Date).toDateString(),
                <Actions item={item} />,
                <ServerIcon />
              ]
            },
            {
              id: item.id + '_detail',
              isOpen: item.expanded,
              cells: [
                {
                  title: item.expanded ? <DetailView /> : 'collapsed content',
                  colSpan: 6
                }
              ]
            }
          ]
        )));

        console.log('data', data, data.length);

        return <Table
            className="pf-m-compact ins-entity-table"
            expandable={true}
            sortBy={this.state.sortBy}
            header={[...this.columns, '', '']}
            //header={columns && {
            //    ...mapValues(keyBy(columns, item => item.key), item => item.title),
            //    health: {
            //        title: 'Health',
            //        hasSort: false
            //    },
            //    action: ''
            //}}
            onSort={this.onSort}
            onRowClick={this.onRowClick}
            onItemSelect={this.onItemSelect}
            onExpandClick={this.onExpandClick}
            hasCheckbox
            rows={data}
            footer={
                <Pagination
                    itemsPerPage={this.state.itemsPerPage}
                    page={this.state.onPage}
                    direction='up'
                    onSetPage={this.onSetPage}
                    onPerPageSelect={this.onPerPageSelect}
                    numberOfItems={data ? rows.length : 0}
                />
            }

        />
    }
};

EntityListView.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

function mapDispatchToProps(dispatch) {
    return {
        loadEntities: () => dispatch(loadEntities()),
        selectEntity: (key, selected) => dispatch(selectEntity(key, selected)),
        expandEntity: (key, expanded) => dispatch(expandEntity(key, expanded)),
        sortEntities: (column, direction) => dispatch(sortEntities(column, direction)),
        pageAndSize: (page, size) => dispatch(pageAndSize(page, size)),
        //filterEntities: (key = 'display_name', filterBy) => dispatch(filterEntities(key, filterBy))
    }
}

const mapStateToProps = (
  {inventory:{rows = [], entities = []}}) => ({entities, rows}
)

//export default EntityListView;
export default connect(mapStateToProps, mapDispatchToProps)(EntityListView)

