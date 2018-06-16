import React from 'react';
import { defineComponent } from 'js-widgets';

import IconLogout from 'svg-react-loader?name=IconLogout!../../../../node_modules/material-design-icons/action/svg/production/ic_power_settings_new_24px.svg';
import IconAvatar from 'svg-react-loader?name=IconLogout!../../../../node_modules/material-design-icons/social/svg/production/ic_person_24px.svg';

const styles = {
  userCtrl: {
    display: 'grid',
    gridTemplateColumns: 'auto auto 4rem',
    justifyItems: 'center',
    alignItems: 'center',
    fontSize: '1rem',
  },

  avatar: {
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    textAlign: 'center',
    verticalAlign: 'middle',
  },

  username: {
    margin: '-0.5rem 0.5rem 0 0.5rem',
    varticalAlign: 'middle'
  },

  logout: {
    padding: '0.5rem 0 0.5rem 0.75rem',
    borderWidth: '0 0 0 1px',
    borderColor: 'inherit',
    borderStyle: 'dotted'
  }
};

export default defineComponent({
  displayName: 'UserCtrl',

  properties: {
    username: {
      type: String
    }
  },

  main({ username }) {
    return (
      <div style={styles.userCtrl}>
        <div style={styles.avatar}>
          <IconAvatar/>
        </div>
        <div style={styles.username}>
          {username}
        </div>
        <div style={styles.logout}>
          <IconLogout/>
        </div>
      </div>
    );
  }
});
