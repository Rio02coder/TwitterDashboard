//https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist#49725198
// The following type is from the above mentioned stack overflow post. This is used for
// taking at least one type.

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export default RequireAtLeastOne;
