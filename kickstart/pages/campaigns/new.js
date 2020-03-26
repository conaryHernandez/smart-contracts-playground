import React, { Component } from 'react';
import { Button, Input, Form, Message } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    minimunContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimunContribution)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimun Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimunContribution}
              onChange={e =>
                this.setState({ minimunContribution: e.target.value })
              }
            />
          </Form.Field>

          <Button loading={this.state.loading} primary>
            Create
          </Button>

          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
