export default interface IDeskproUser {
  emails: string[];
  name: string;
  firstName: string;
  id: string;
  lastName: string;
  primaryEmail: string;
  orgName: string;
  ticket: {
    id: string;
  };
}
