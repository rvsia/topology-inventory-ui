import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import asyncComponent from '../../Utilities/asyncComponent';
import './sample-page.scss';

import { Donut, PageHeader, PageHeaderTitle, Section } from '@red-hat-insights/insights-frontend-components';

import { Button, Grid, GridItem } from '@patternfly/react-core';
import { Card, CardHeader, CardBody, CardFooter, Gallery, Modal } from '@patternfly/react-core';

const SampleComponent = asyncComponent(() => import('../../PresentationalComponents/SampleComponent/sample-component'));
//const EntityListView = asyncComponent(() => import('../../PresentationalComponents/EntityListView/entity-list-view'));
import EntityListView from '../../PresentationalComponents/EntityListView/entity-list-view';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class SamplePage extends Component {
    // <SampleComponent> Sample Component </SampleComponent>
    // <h1> Cards </h1>
    // <h1> Buttons </h1>
    // <Section type='button-group'>
    //     <Button variant='primary'> PF-Next Primary Button </Button>
    //     <Button variant='secondary'> PF-Next Secondary Button </Button>
    //     <Button variant='tertiary'> PF-Next Tertiary Button </Button>
    //     <Button variant='danger'> PF-Next Danger Button </Button>
    // </Section>

    render() {
        return (
            <React.Fragment>
                <Modal title='Add New Provider' isOpen={this.props.location.pathname == '/providers/new'} onClose={this.props.history.goBack}>
                  foobar
                </Modal>
                <PageHeader>
                    <PageHeaderTitle title='Providers'/>
                </PageHeader>
                <Section type='content'>
                    <Gallery>
                      <Card>
                        <CardHeader>Karta</CardHeader>
                        <CardBody><Donut withLegend identifier='orech' values={[['Red Hat', 100], ['Google', 10]]}/></CardBody>
                        <CardFooter>Footer</CardFooter>
                      </Card>

                      <Card>
                        <CardBody>
                          <p>5 Cloud</p>
                          <p>2 Virtual Infrastructure</p>
                          <p>1 Physical Infrastructure</p>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardBody>
                          <p>1 Network</p>
                          <p>0 Storage</p>
                          <p>0 Automation</p>
                        </CardBody>
                      </Card>

                      <Card>
                          <CardBody>
                              <Section type='button-group'>
                                  <Link to='/providers/new'>
                                    <Button variant='primary'> Add New Provider </Button>
                                  </Link>
                              </Section>
                          </CardBody>
                      </Card>
                    </Gallery>

                    <EntityListView />
                </Section>
            </React.Fragment>
        );
    }
}

export default withRouter(SamplePage);
