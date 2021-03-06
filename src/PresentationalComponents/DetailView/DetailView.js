import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId'
import { Card, Grid, GridItem, Button } from '@patternfly/react-core';
import { Donut } from '@red-hat-insights/insights-frontend-components';
//import { Pie } from '@red-hat-insights/insights-frontend-components';

class DetailView extends Component {
    render() {
        return (
          <Grid>
              <GridItem sm={6} md={4} lg={4} xl={4}>
                  <Donut withLegend identifier={uniqueId('donut')} values={[['Red Hat', 100], ['Google', 10]]}/>
              </GridItem>
              <GridItem sm={6} md={4} lg={4} xl={4}>
                  <dl>
                    <dt>IP Address</dt><dd>192.168.2.1</dd>
                    <dt>Location</dt><dd>Brno</dd>
                    <dt>Status</dt><dd>Ready for Fredie</dd>
                    <dt>Licence</dt><dd>Apache Licence 2.0</dd>
                  </dl>
              </GridItem>
              <GridItem sm={6} md={4} lg={4} xl={3}>
                  <Button variant='primary'>Tag</Button>
                  <Button variant='primary'>Animal</Button>
                  <Button variant='primary'>Foobar</Button>
                  <Button variant='primary'>Another Tag</Button>
              </GridItem>
          </Grid>
        )
    }
}

export default DetailView;
