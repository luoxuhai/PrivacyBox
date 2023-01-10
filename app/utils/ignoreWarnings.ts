/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
import { LogBox } from 'react-native';

if (__DEV__) {
  // prettier-ignore
  LogBox.ignoreLogs([
  "Require cycle:",
  "Could not find Fiber",
  "You",
  "Found",
])
}
