import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@zonudex/dexswap-sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { PageWrapper } from './styleds'

import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { OutlineCard } from '../../components/Card'
import { TYPE, HideSmall, StyledInternalLink } from '../../theme'
import { Text } from 'rebass'
import { RowBetween, RowFixed } from '../../components/Row'
import { ButtonPrimary, ButtonSecondary, ButtonWithLink } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toDexSwapLiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { CardSection } from '../../components/earn/styled'

const VoteCard = styled.div`
  overflow: hidden;
  background-color: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.bg2};
  border-radius: 8px;
`

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`

const ButtonRow = styled(RowFixed)`
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `};
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text5};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Pool() {
  const { account, chainId } = useActiveWeb3React()

  const trackedTokenPairs = useTrackedTokenPairs()

  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toDexSwapLiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [dexSwapPairsBalances] = useTokenBalancesWithLoadingIndicator(account ?? undefined, liquidityTokens)

  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        dexSwapPairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, dexSwapPairsBalances]
  )

  const dexSwapPairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))

  const alldexSwapPairsWithLiquidity = dexSwapPairs
    .map(([, pair]) => pair)
    .filter((dexSwapPair): dexSwapPair is Pair => Boolean(dexSwapPair))

  return (
    <>
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />

        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
              <HideSmall>
                <TYPE.mediumHeader lineHeight="24px">Your liquidity</TYPE.mediumHeader>
              </HideSmall>
              <ButtonRow>
                <ResponsiveButtonSecondary as={Link} padding="8px 14px" to="/create">
                  <Text fontWeight={700} fontSize={12} lineHeight="15px">
                    CREATE PAIR
                  </Text>
                </ResponsiveButtonSecondary>
                <ResponsiveButtonPrimary id="join-pool-button" as={Link} padding="8px 14px" to="/add/ETH">
                  <Text fontWeight={700} fontSize={12}>
                    ADD LIQUIDITY
                  </Text>
                </ResponsiveButtonPrimary>
              </ButtonRow>
            </TitleRow>

            {!account ? (
              <OutlineCard>
                <TYPE.body fontSize="14px" lineHeight="17px" textAlign="center">
                  Connect to a wallet to view your liquidity.
                </TYPE.body>
              </OutlineCard>
            ) : alldexSwapPairsWithLiquidity?.length > 0 ? (
              alldexSwapPairsWithLiquidity.map(dexSwapPair => (
                <FullPositionCard key={dexSwapPair.liquidityToken.address} pair={dexSwapPair} />
              ))
            ) : (
              <EmptyProposals>
                <TYPE.body fontSize="14px" lineHeight="17px" textAlign="center">
                  No liquidity found
                </TYPE.body>
              </EmptyProposals>
            )}
          </AutoColumn>
        </AutoColumn>
        {account && chainId && (
          <>
            <ButtonWithLink
              link={`#`}
              text={'ACCOUNT ANALYTICS AND ACCRUED FEES'}
              marginTop="32px"
            />
            <TYPE.body
              color="text4"
              textAlign="center"
              fontWeight="500"
              fontSize="14px"
              lineHeight="17px"
              marginTop="32px"
            >
              Don't see a pool you joined?{' '}
              <StyledInternalLink color="text5" id="import-pool-link" to="/find">
                Import it.
              </StyledInternalLink>
            </TYPE.body>
          </>
        )}

        <VoteCard style={{ marginTop: '32px' }}>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.body fontWeight={600} lineHeight="20px">
                  Liquidity provider rewards
                </TYPE.body>
              </RowBetween>
              <RowBetween>
                <TYPE.body fontWeight="500" fontSize="12px" lineHeight="20px" letterSpacing="-0.4px">
                  Liquidity providers earn a swap fee (0.25% by default) on all trades proportional to their share of
                  the pool.
                  <br /> Fees are added to the pool, accrue in real time and can be claimed by withdrawing your
                  liquidity.
                  <br /> The swap fee value is decided by DexSwap and liquidity providers, it can be between 0% and 10%
                  and it uses 0.25% as default value that is assigned when the pair is created.
                </TYPE.body>
              </RowBetween>
            </AutoColumn>
          </CardSection>
        </VoteCard>
      </PageWrapper>
    </>
  )
}
