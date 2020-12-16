import React, {useEffect} from 'react';
import {
  FormSelect,
  FormSelectOption,
  TextInput,
  Grid,
  GridItem,
  FormGroup,
} from '@patternfly/react-core';
import { TrashIcon, UndoIcon } from '@patternfly/react-icons';
import { APP_FEATURES } from '../../common/app_features';
import { Feature } from '../feature/feature';
import { useFeatures } from '../../context/feature_context/feature_hook';
import { FormManager } from '../../context/form_manager/form_manager';
import { EngagementUser } from '../../schemas/engagement';
import { useEngagements } from '../../context/engagement_context/engagement_hook';

export interface UserRowProps {
  users: any,
  user: any;
  onChange: (users: EngagementUser[]) => void;
  toggleDeleted: (email: string) => void;
  validateEmail: (email: string) => boolean,
  validateString: (name: string) => boolean,
  validateRole: (role: string) => boolean,
  deletedUsers: string[];
  key: number
}

export const UserRow = ({
  users,
  user,
  onChange,
  toggleDeleted,
  validateEmail,
  validateString,
  validateRole,
  deletedUsers,
  key
}: UserRowProps) => {
  const { engagementFormConfig } = useEngagements();
  const { hasFeature } = useFeatures();
  const { registerField } = FormManager.useFormGroupManager();
  useEffect(() => registerField('engagement_users'), [registerField]);

  const isUserDeleted = deletedUsers.indexOf(user.email) > -1;

  return (
    <div key={key}>
      <Grid hasGutter style={{ marginTop: '1rem' }}>
        <GridItem span={3}>
          <FormGroup
            fieldId={'user_email'}
            helperTextInvalid={'Enter valid email address'}
            validated={
              validateEmail(user.email)
                ? 'default'
                : 'error' }
          >
            <TextInput
              aria-label="email"
              name="email"
              data-cy={'input_user_email'}
              isRequired
              isDisabled={
                !hasFeature(APP_FEATURES.writer) ||
                isUserDeleted
              }
              onChange={e => {
                user.email = e;
                onChange(users);
              }}
              placeholder="Email Address"
              type="email"
              value={user.email|| ''}
              style={
                isUserDeleted
                  ? { textDecorationLine: 'line-through' }
                  : {}
              }
            />
          </FormGroup>
        </GridItem>
        <GridItem span={3}>
          <FormGroup
            fieldId={'user_first_name'}
            helperTextInvalid={'Enter valid first name'}
            validated={
              validateString(user.first_name)
                ? 'default'
                : 'error' }
          >
            <TextInput
              aria-label="First Name"
              name="first-name"
              data-cy={'input_user_firstname'}
              isRequired
              isDisabled={
                !hasFeature(APP_FEATURES.writer) ||
                isUserDeleted
              }
              onChange={e => {
                user.first_name = e;
                onChange(users);
              }}
              placeholder="First Name"
              type="text"
              value={user.first_name || ''}
              style={
                isUserDeleted
                  ? { textDecorationLine: 'line-through' }
                  : {}
              }
            />
          </FormGroup>
        </GridItem>
        <GridItem span={3}>
          <FormGroup
            fieldId={'user_last_name'}
            helperTextInvalid={'Enter valid last name'}
            validated={
              validateString(user.last_name)
                ? 'default'
                : 'error' }
          >
            <TextInput
              aria-label="Last Name"
              name="last-name"
              data-cy={'input_user_lastname'}
              isRequired
              isDisabled={
                !hasFeature(APP_FEATURES.writer) ||
                isUserDeleted
              }
              onChange={e => {
                user.last_name = e;
                onChange(users);
              }}
              placeholder="Last Name"
              type="text"
              value={user.last_name || ''}
              style={
                isUserDeleted
                  ? { textDecorationLine: 'line-through' }
                  : {}
              }
            />
          </FormGroup>
        </GridItem>
        <GridItem span={2}>
          <FormGroup
            fieldId={'user_role'}
            helperTextInvalid={'Select valid role'}
            validated={
              validateRole(user.role)
                ? 'default'
                : 'error' }
          >
            <FormSelect
              name="role"
              aria-label="User Role"
              id="user_role_dropdown"
              value={user.role || ''}
              isDisabled={
                !hasFeature(APP_FEATURES.writer) ||
                isUserDeleted
              }
              onChange={e => {
                user.role = e;

                onChange(users);
              }}
              style={
                isUserDeleted
                  ? { textDecorationLine: 'line-through' }
                  : {}
              }
              isRequired
            >
              {[
                <FormSelectOption
                  isDisabled={true}
                  key={'placeholder'}
                  value={undefined}
                  label={'Select a role'}
                />,
              ].concat(
                (
                  engagementFormConfig?.user_options
                    ?.user_roles?.options ?? []
                )?.map((option: any, index: number) => (
                  <FormSelectOption
                    isDisabled={option.disabled}
                    key={index}
                    value={option.value}
                    label={option.label}
                    data-cy={option.label}
                  />
                ))
              )}
            </FormSelect>
          </FormGroup>
        </GridItem>
        <GridItem span={1} style={{ paddingTop: '0.5rem' }}>
          <Feature name={APP_FEATURES.writer}>
            {isUserDeleted ? (
              <UndoIcon
                onClick={() => {
                  toggleDeleted(user.email);
                }}
                data-test-id={`remove-user-button`}
                style={{ fontSize: 'small' }}
              />
            ) : (
              <TrashIcon
                onClick={() => {
                  toggleDeleted(user.email);
                }}
                style={{ fontSize: 'small' }}
              />
            )}
          </Feature>
        </GridItem>
      </Grid>
    </div>
  );
};