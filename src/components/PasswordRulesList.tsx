import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  passwordRules,
  noUsername,
  matchPassword,
  type PasswordRule,
} from "../utils/passwordRules";

type PasswordRulesProps = {
  password: string;
  username?: string;
  usernameRule?: boolean;
  confirmPassword?: string;
  confirmPasswordRule?: boolean;
};

export function PasswordRulesList({
  password,
  username = "",
  usernameRule = false,
  confirmPassword = "",
  confirmPasswordRule = false,
}: PasswordRulesProps) {
  let rules: PasswordRule[] = [...passwordRules];

  if (usernameRule) {
    rules.push(noUsername);
  } else if (confirmPasswordRule) {
    rules.push(matchPassword(password, confirmPassword));
  }

  return rules.map((rule) => {
    const passed = rule.test(password, username);
    return (
      <li key={rule.id} className="flex items-center text-sm">
        {passed ? (
          <IoIosCheckmarkCircle className="mr-2" color="#4BB543" />
        ) : (
          <span className="w-3 h-3 mr-2 rounded-full border border-gray-400 inline-block" />
        )}
        <span className={passed ? "text-green-600" : "text-gray-700"}>
          {rule.message}
        </span>
      </li>
    );
  });
}
