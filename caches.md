### sync_last_entry
for storing last record datetime of sync table
The key name `sync_last_entry` is decided by static property `$syncEntryCacheKey` of `Sync` model

### last_sync_time
for storing last synchronized datetime
The key name `last_sync_time` is decided by static property `$syncTimeCacheKey` of `Sync` model

### pending_syncs
for storing sync ids as array where status are not done
The key name `pending_syncs` is decided by static property `$syncPendingCacheKey` of `Sync` model

### sync_time
for storing sync time for each server controller
The key name `sync_time` is decided by static property `$SyncTimeCacheKey` of `SyncController`

### remote_items
for storing remote items which are got stored here
The key name `remote_items` is decided by static property `$RemoteItemsCacheKey` of `Remote` model

### cloud_kitchens
for storing kitchen ids as array, where have cloud facility available
The key name `cloud_kitchens` is decided by static property `$cloudKitchensCacheKey` of `Kitchen` model



