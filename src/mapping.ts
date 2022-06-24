import { Claimed } from "../generated/MerkleRewards/MerkleRewards"
import { ClaimedEntity } from "../generated/schema"

export function handleClaimed(event: Claimed): void {
  const id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = ClaimedEntity.load(id)
  if (entity == null) {
    entity = new ClaimedEntity(id)
  }

  entity.account = event.params.account
  entity.amount = event.params.amount
  entity.totalAmount = event.params.totalAmount
  entity.transactionHash = event.transaction.hash
  entity.contractAddress = event.address

  entity.save()
}
