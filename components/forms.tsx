import Link from 'next/link'
import clsx from 'clsx'

export function getButtonClassName({
  size,
  variant,
}: {
  size: 'xs' | 'sm' | 'md' | 'md-wide' | 'pill'
  variant: 'primary' | 'secondary'
}) {
  const baseClassName =
    'text-center rounded-full font-bold outline-none transition-[background-color,color] duration-200 disabled:bg-night-500 disabled:text-night-200'
  const primaryClassName =
    'bg-accent-purple hover:bg-accent-yellow hover:text-night-700 focus:bg-accent-yellow focus:text-night-700 active:bg-accent-yellow-muted'
  const secondaryClassName =
    'border-[1.5px] border-night-400 bg-night-700 hover:border-accent-purple focus:border-accent-purple active:border-accent-purple-lighter'
  const extraSmallClassName = 'py-2 px-3 text-body-xs'
  const smallClassName = 'px-10 py-[14px] text-body-xs'
  const mediumClassName = 'px-14 py-5 text-lg'
  const mediumWideClassName = 'px-24 py-5 text-lg'
  const pillClassName = 'px-12 py-3 leading-3'
  const className = clsx(baseClassName, {
    [primaryClassName]: variant === 'primary',
    [secondaryClassName]: variant === 'secondary',
    [extraSmallClassName]: size === 'xs',
    [smallClassName]: size === 'sm',
    [mediumClassName]: size === 'md',
    [mediumWideClassName]: size === 'md-wide',
    [pillClassName]: size === 'pill',
  })
  return className
}

export function ButtonLink({
  size,
  variant,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> &
  Parameters<typeof getButtonClassName>[0]) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <Link {...props} className={getButtonClassName({size, variant})} />
}
